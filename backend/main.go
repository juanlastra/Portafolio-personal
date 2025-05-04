package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

// Structura proyectos en github

type GithubTreeRespuesta struct {
	Tree []GithubTreItems `json:"tree"`
}

type GithubTreItems struct {
	Path string `json:"path"`
	Type string `json:"type"`
	Url  string `json:"url"`
}

type Proyecto struct {
	Carpeta   string `json:"carpeta"`
	Titulo    string `json:"titulo"`
	Parrafo   string `json:"parrafo"`
	ImagenUrl string `json:"imagen_url"`
}

func construir_raw(usuario, repo, branch, path string) string {
	return fmt.Sprintf("https://raw.githubusercontent.com/%s/%s/%s/%s", usuario, repo, branch, path)
}

// función para extraer la información

func extraer_info() {
	Usuario := "juanlastra"
	RepoName := "Gr-ficos-con-R"
	Branch := "main"

	// extraer info

	infoUrl := fmt.Sprintf("https://api.github.com/repos/%s/%s/git/trees/%s?recursive=1",
		Usuario, RepoName, Branch)

	resp, err := http.Get(infoUrl)

	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	var tree GithubTreeRespuesta

	if err := json.NewDecoder(resp.Body).Decode(&tree); err != nil {
		panic(err)
	}

	proyecto := make(map[string]*Proyecto)

	for _, item := range tree.Tree {

		// ignorar items diferentes de blob
		if item.Type != "blob" {
			continue
		}

		// ignorar archivos de raiz
		partes := strings.Split(item.Path, "/")

		if len(partes) < 2 {
			continue
		}

		carpeta := partes[0]

		if _, ok := proyecto[carpeta]; !ok {
			proyecto[carpeta] = &Proyecto{Carpeta: carpeta}
		}

		pathlower := strings.ToLower(item.Path)

		switch {

		case strings.HasSuffix(pathlower, ".png"):
			proyecto[carpeta].ImagenUrl = construir_raw(Usuario, RepoName, Branch, item.Path)

		case strings.Contains(pathlower, ".md"):
			urlraw := construir_raw(Usuario, RepoName, Branch, item.Path)
			proyecto[carpeta].Titulo, proyecto[carpeta].Parrafo = leer_readme(urlraw)
		}

	}

	// Convertir a slice
	var listaProyectos []Proyecto
	for _, p := range proyecto {
		listaProyectos = append(listaProyectos, *p)
	}

	// Exportar como JSON
	jsonBytes, err := json.MarshalIndent(listaProyectos, "", "  ")
	if err != nil {
		panic(err)
	}

	if err := os.WriteFile("proyectos.json", jsonBytes, 0644); err != nil {
		panic(err)
	}

	fmt.Println("Archivo proyectos.json generado correctamente.")

}

// leer el archivo readme.md
func leer_readme(Apiurl string) (string, string) {

	resp, err := http.Get(Apiurl)
	if err != nil {
		fmt.Println("Error al hacer la solicitud con GET:", err)
		return "", ""
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error al leer el cuerpo de la respuesta:", err)
		return "", ""
	}

	contenido := string(body)

	// Separar por bloques de texto (párrafos), divididos por doble salto de línea
	bloques := strings.Split(contenido, "\n\n")

	if len(bloques) < 2 {
		fmt.Println("Contenido inesperado: no hay suficientes bloques.")
		return "", ""
	}

	// Primer bloque: título
	titulo := strings.TrimPrefix(strings.TrimSpace(bloques[0]), "# ")

	// Segundo bloque: primer párrafo
	parrafo := strings.ReplaceAll(strings.TrimSpace(bloques[1]), "\n", " ")

	return titulo, parrafo
}

func main() {
	extraer_info()
}
