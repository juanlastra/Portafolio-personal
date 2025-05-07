"use client";

import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {features} from "@/data/features";
import {pricing} from "@/data/pricing";
import {CircleCheck} from "lucide-react";

// importar carousel

import EmblaCarousel from "@/components/ui/EmblaCarousel";

export default function Home() {
    return (
        <>
            <div className="border-b border-border">
                <main className="container mx-auto">
                    <div className="relative md:mt-20 mx-auto w-full max-w-4xl pt-4 text-center">
                     
                    <h1 className="text-3xl md:text-5xl my-2 font-extrabold leading-snug md:leading-tight">
  🌍 Economista especializado en análisis geoespacial,<br className="hidden md:block" />
  📊 datos y 🧠 modelos estadísticos
</h1>
                        <p className="mx-auto my-4 text-sm w-full max-w-xl text-center font-medium leading-relaxed tracking-wide">
                        Me dedico a transformar datos en conocimiento accionable. Como economista, combino modelos estadísticos y análisis geoespacial para responder preguntas complejas sobre el territorio, los mercados y las decisiones económicas. Domino R y sus principales paquetes para análisis y visualización, y estoy expandiendo mis habilidades hacia el desarrollo web con Go y Next.js.
                        </p>

                        <div
                            className="absolute top-0 -z-10 max-h-full max-w-screen-lg w-full h-full blur-2xl">
                            <div
                                className="absolute top-24 left-24 w-56 h-56 bg-violet-600 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl">
                            </div>
                            <div
                                className="absolute hidden md:block bottom-2 right-1/4 w-56 h-56 bg-sky-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-1000 filter blur-3xl"></div>
                            <div
                                className="absolute hidden md:block bottom-1/4 left-1/3 w-56 h-56 bg-pink-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-500 filter blur-3xl"></div>
                        </div>
                    </div>

                </main>
            </div>

            {/* features */}

            <section
                className="border-b border-border bg-gradient-to-b from-background to-transparent via-background via-90% relative">
                <div className="container mx-auto text-center">
                    <div className="my-24">
                        
                    <h5 className="text-primary">
  SOBRE MÍ
</h5>
<h2 className="text-4xl font-extrabold my-4">
  Construyo soluciones digitales claras, útiles y bien pensadas
</h2>

<p className="mx-auto my-4 text-sm w-full max-w-md bg-transparent text-center font-medium leading-relaxed tracking-wide text-muted-foreground">
  Desde visualizaciones de datos hasta aplicaciones web, mi enfoque está en crear experiencias que comuniquen, funcionen y se sientan bien.
</p>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
  {features.map((feature) => (
    
    <Card key={feature.titulo} className="max-w-lg mx-auto">
  <a
    href={`https://github.com/juanlastra/Gr-ficos-con-R/tree/main/${feature.carpeta}`}
    target="_blank"
    rel="noopener noreferrer"
    className="block"
  >
    <CardHeader>
      <div className="w-[300px] h-[500px] overflow-hidden rounded-xl mx-auto border border-border">
        <Image
          src={feature.imagen_url}
          alt={feature.titulo}
          width={300}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
    </CardHeader>
    <CardContent>
      <CardTitle>{feature.titulo}</CardTitle>
      <CardDescription className="mt-4">
        {feature.parrafo}
      </CardDescription>
    </CardContent>
  </a>
</Card>

  ))}
</div>

                    </div>
                </div>
                <div
                    className="absolute top-0 -z-10 max-h-full w-full h-full blur-2xl">
                    <div
                        className="absolute bottom-0 left-0 w-1/2 h-56 bg-violet-600 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl">
                    </div>
                    <div
                        className="absolute bottom-0 right-0 w-1/2 h-56 bg-sky-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-1000 filter blur-3xl"></div>
                </div>
            </section>
        </>
    );
}