import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import parse from "html-react-parser";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [grade, setGrade] = useState("");
  const [area, setArea] = useState("");
  const [subject, setSubject] = useState("");
  const [institution, setInstitution] = useState("");
  const [rector, setRector] = useState("");
  const [viceRector, setViceRector] = useState("");
  const [teacher, setTeacher] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [generatedBios, setGeneratedBios] = useState<string>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const initialSkills = [
    "M.2.2.10. Medir, estimar y comparar longitudes de objetos del entorno, contrastándolas con patrones de medidas no convencionales.",
    "M.2.2.11. Utilizar las unidades de medida de longitud: el metro y sus submúltiplos (dm, cm, mm) en la estimación y medición de longitudes de objetos del entorno.",
    "M.2.2.13. Representar cantidades monetarias con el uso de monedas y billetes de 1, 5, 10, 20, 50 y 100 (didácticos).",
    "M.2.2.15. Utilizar la unidad monetaria en actividades lúdicas y en transacciones cotidianas simples, destacando la importancia de la integridad y la honestidad.",
    "M.2.2.16. Reconocer día, noche, mañana, tarde, hoy, ayer, días de la semana y los meses del año para valorar el tiempo propio y el de los demás, y ordenar situaciones temporales secuenciales asociándolas con eventos significativos.",
    "M.2.2.19. Medir, estimar y comparar masas contrastándolas con patrones de medidas no convencionales."
  ];

  useEffect(() => {
    setSkills(initialSkills);
  }, []);

  const handleSkillSelection = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    }
  };

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const generateBio = async (e) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `I am creating an app that generates class plans for students. We have various student grade levels, such as First Grade, Second Grade.. All of them have their own theme for creating a class plan. Please, create a long and perfect class plan according to the student's grade level and the theme. The student's grade is ${grade}, the theme is ${bio}, the area of study is ${area}, and the subject is ${subject}. The institution is ${institution}, the rector is ${rector}, the vice-rector is ${viceRector}, and the teacher is ${teacher}. The skills are ${selectedSkills.join(", ")}.`,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    setGeneratedBios(data);
    scrollToBios();
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Lesson Plan Generator</title>
        <meta name="description" content="Generated by AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={generateBio}>
          <label>
            Enter the topic for your lesson plan:
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </label>
          <DropDown
            label="Grado Escolar"
            selectedOption={grade}
            options={[
              "Primero de Primaria",
              "Segundo de Primaria",
              "Tercero de Primaria",
              "Cuarto de Primaria",
              "Quinto de Primaria",
              "Sexto de Primaria",
              "Primero de Secundaria",
              "Segundo de Secundaria",
              "Tercero de Secundaria",
              "Primero de Preparatoria",
              "Segundo de Preparatoria",
              "Tercero de Preparatoria",
            ]}
            onSelectOption={setGrade}
          />
          <DropDown
            label="Área de Estudio"
            selectedOption={area}
            options={[
              "Matemáticas",
              "Ciencias Sociales",
              "Ciencias Naturales",
              "Lengua Extranjera",
              "Lengua y Literatura",
              "Educación Cultural y Artística",
              "Educación Física",
              "Interdisciplinar",
            ]}
            onSelectOption={setArea}
          />
          <DropDown
            label="Asignatura"
            selectedOption={subject}
            options={[
              "Subnivel Básico Elemental",
              "Subnivel Básico Media",
              "Subnivel Bachillerato Superior",
              "Subnivel Bachillerato Superior",
            ]}
            onSelectOption={setSubject}
          />
          <label>
            Enter the Institution name:
            <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} />
          </label>
          <label>
            Enter the Rector name:
            <input type="text" value={rector} onChange={(e) => setRector(e.target.value)} />
          </label>
          <label>
            Enter the Vice-rector name:
            <input type="text" value={viceRector} onChange={(e) => setViceRector(e.target.value)} />
          </label>
          <label>
            Enter the Teacher name:
            <input type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} />
          </label>
          <div>
            <h2>Select Skills:</h2>
            {skills.map((skill, index) => (
              <div key={index}>
                <input type="checkbox" id={`skill${index}`} checked={selectedSkills.includes(skill)} onChange={() => handleSkillSelection(skill)} />
                <label htmlFor={`skill${index}`}>{skill}</label>
              </div>
            ))}
          </div>
          <button type="submit">Generate Lesson Plan</button>
        </form>
        <div>
          <h2>Generated Plan:</h2>
          {generatedBios && parse(generatedBios)}
        </div>
      </main>
    </div>
  );
};

export default Home;
