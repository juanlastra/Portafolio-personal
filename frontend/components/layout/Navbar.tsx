import Link from "next/link";
import {Button} from "@/components/ui/button";
import {navLinks} from "@/data/navLinks";
import {ThemeChanger} from "@/app/Theme-changer";
import Image from "next/image";



const Navbar = () => {
    
    return (
        <nav className="py-4 bg-background/30 backdrop-blur-sm">
            <div className="container flex flex-row justify-between items-center">
                <Image
                src = "/Juanlastralogo.png"
                alt="Logo externo"
                width={220}
                height={220}
                 className="dark:invert"
                ></Image>
               <ul className="md:flex flex-row justify-between gap-11 hidden">
    {navLinks.map((link) => (
        <li key={link.title}>
            <Link href={link.href} className="text-xl flex items-center gap-2">
                <link.icon/>
                {link.title}
            </Link>
        </li>
    ))}
</ul>


                <div className="flex flex-row justify-end space-x-2">
                    <ThemeChanger/>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;