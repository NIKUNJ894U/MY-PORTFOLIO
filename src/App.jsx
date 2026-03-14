import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {

const [repos,setRepos] = useState([])
const [menuOpen,setMenuOpen] = useState(false)

const skills = [
{name:"HTML",level:0},
{name:"CSS",level:0},
{name:"JavaScript",level:0},
{name:"React",level:0},
{name:"Python",level:30},
{name:"C",level:25},
{name:"C++",level:0},
]

/* LOAD GITHUB PROJECTS */

useEffect(()=>{
axios.get("https://api.github.com/users/NIKUNJ894U/repos")
.then(res=>{
setRepos(res.data.slice(0,6))
})
},[])

/* MATRIX BACKGROUND */

useEffect(()=>{

const canvas = document.getElementById("matrix")
const ctx = canvas.getContext("2d")

canvas.height = window.innerHeight
canvas.width = window.innerWidth

const letters = "01"
const fontSize = 14
const columns = canvas.width/fontSize

const drops = []

for(let x=0;x<columns;x++) drops[x]=1

function draw(){

ctx.fillStyle="rgba(0,0,0,0.05)"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="#0f0"
ctx.font=fontSize+"px monospace"

for(let i=0;i<drops.length;i++){

const text = letters[Math.floor(Math.random()*letters.length)]

ctx.fillText(text,i*fontSize,drops[i]*fontSize)

if(drops[i]*fontSize>canvas.height && Math.random()>0.975)
drops[i]=0

drops[i]++

}

}

setInterval(draw,33)

},[])

/* GLOW CURSOR */

useEffect(()=>{

const cursor = document.getElementById("cursor")

document.addEventListener("mousemove",(e)=>{
cursor.style.left=e.clientX+"px"
cursor.style.top=e.clientY+"px"
})

},[])

return (

<div className="bg-[#0a0a0f] text-white min-h-screen flex">

{/* MATRIX BG */}

<canvas id="matrix" className="fixed top-0 left-0 w-full h-full -z-10"></canvas>

{/* GLOW CURSOR */}

<div
id="cursor"
style={{
width:"20px",
height:"20px",
borderRadius:"50%",
background:"#a855f7",
position:"fixed",
pointerEvents:"none",
boxShadow:"0 0 20px #a855f7",
zIndex:9999
}}
></div>

{/* SIDE MENU */}

<div className={`fixed left-0 top-0 h-full bg-[#111] w-56 p-6 border-r border-purple-600 transition ${menuOpen ? "translate-x-0" : "-translate-x-56"} md:translate-x-0`}>

<h1 className="text-purple-500 font-bold text-xl mb-10">
NIKUNJ
</h1>

<div className="flex flex-col gap-6 text-gray-300">

<a href="#hero" className="hover:text-purple-400">Home</a>
<a href="#about" className="hover:text-purple-400">About</a>
<a href="#skills" className="hover:text-purple-400">Skills</a>
<a href="#projects" className="hover:text-purple-400">Projects</a>
<a href="#contact" className="hover:text-purple-400">Contact</a>

</div>

</div>

{/* MAIN */}

<div className="flex-1 md:ml-56">

<button
className="md:hidden fixed top-5 left-5 z-50 bg-purple-600 px-3 py-1 rounded"
onClick={()=>setMenuOpen(!menuOpen)}
>
Menu
</button>

{/* HERO */}

<section id="hero" className="text-center pt-32 pb-24">

<motion.h1
initial={{opacity:0,y:-50}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
className="text-6xl md:text-8xl font-extrabold text-purple-500 drop-shadow-[0_0_25px_#a855f7]"
>

NIKUNJ

</motion.h1>

<p className="text-gray-400 mt-6 text-xl">
BCA STUDENT • WEB DEVELOPER • TECH ENTHUSIAST • FRESHER
</p>

</section>

{/* ABOUT */}

<section id="about" className="max-w-4xl mx-auto text-center mb-24 px-6">

<h2 className="text-3xl font-bold text-purple-500 mb-6">
ABOUT ME
</h2>

<p className="text-gray-400 text-lg">
Hello There , My Name is NIKUNJ SINGHAL and I am a passionate web developer and tech enthusiast. I am constantly learning and exploring new technologies to enhance my skills. I am currently pursuing a BCA degree, which has provided me with a solid understanding of computer science principles and programming concepts. I am eager to apply my knowledge and creativity to build innovative web applications and contribute to the tech community.
I want to learn and grow in the field of web development and make a positive impact through my work.
</p>

</section>

{/* SKILLS */}
<section id="skills" className="max-w-5xl mx-auto mb-24 px-6">

<h2 className="text-3xl text-center font-bold text-purple-500 mb-8">
SKILLS
</h2>

{/* TERMINAL HEADER */}

<div className="bg-black text-green-400 font-mono p-4 rounded mb-10 shadow-[0_0_15px_#00ff9d]">

<p>&gt; loading skills...</p>
<p>&gt; system ready</p>

</div>

{/* SKILL CARDS */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-8">

{[
{name:"HTML",progress:"0%"},
{name:"CSS",progress:"0%"},
{name:"JavaScript",progress:"0%"},
{name:"React",progress:"0%"},
{name:"Python",progress:"30%"},
{name:"C",progress:"25%"},
{name:"C++",progress:"0%"}
].map(skill => (

<motion.div
key={skill.name}
whileHover={{scale:1.1}}
className="bg-[#111] border border-purple-600 p-6 rounded-xl text-center
shadow-[0_0_15px_#a855f7] hover:shadow-[0_0_30px_#a855f7] transition"
>

<p className="text-lg font-semibold">
{skill.name}
</p>

<p className="text-purple-400 mt-2 text-sm font-mono">
Progress: {skill.progress}
</p>

</motion.div>

))}

</div>

</section>


{/* PROJECTS */}

<section id="projects" className="max-w-6xl mx-auto mb-24 px-6">

<h2 className="text-3xl text-center font-bold text-purple-500 mb-12">
GITHUB PROJECTS
</h2>

<div className="grid md:grid-cols-3 gap-8">

{repos.map(repo=>(

<motion.div
whileHover={{scale:1.05,rotateX:5,rotateY:5}}
key={repo.id}
className="bg-[#111] p-6 rounded-xl border border-purple-600 shadow-[0_0_12px_#a855f7]"
>

<h3 className="font-bold text-lg">
{repo.name}
</h3>

<p className="text-gray-400 mt-2">
{repo.description}
</p>

<a
href={repo.html_url}
target="_blank"
className="text-purple-400 mt-4 block"
>
View Repository
</a>

</motion.div>

))}

</div>

</section>

{/* CONTACT */}

<section id="contact" className="text-center pb-24">

<h2 className="text-3xl font-bold text-purple-500 mb-6">
CONTACT
</h2>

<p>
nsinghal357@gmail.com
</p>

</section>

</div>

</div>

)
}

export default App
