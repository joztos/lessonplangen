// Import necessary modules
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { OptionType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import parse from "html-react-parser";

const gradeLevels: OptionType[] = [
  { label: 'Elemental', value: 'Elemental' },
  { label: 'Media', value: 'Media' },
  { label: 'Superior', value: 'Superior' },
  { label: 'Bachillerato General Unificado', value: 'Bachillerato General Unificado' },
];

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [lessonPlan, setLessonPlan] = useState("");
  const [gradeLevel, setGradeLevel] = useState<OptionType>(gradeLevels[0]);
  const [generatedLessonPlans, setGeneratedLessonPlans] = useState<string>("");

  const lessonPlanRef = useRef<null | HTMLDivElement>(null);

  const scrollToLessonPlans = () => {
    if (lessonPlanRef.current !== null) {
      lessonPlanRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    console.log(generatedLessonPlans);
  }, [generatedLessonPlans]);

  const prompt =
    "Estoy creando una aplicación que genera planeaciones de clase para estudiantes. Contamos con varios niveles de grado de estudiantes, como Elemental, Media, Superior, Bachillerato General Unificado.. Todos ellos tienen su propio tema para crear una planeación de clase. Por favor, crea un planeación de clase larga y perfecta de acuerdo al nivel de grado del estudiante y al tema..  grado del estudiante es " +
    gradeLevel.label +
    " el tema es " +
    lessonPlan +
    `\n. Your response must be formatted using HTML Elements for easier readability, including paragraph tags, line breaks, headings and bold titles where applicable, no need to create Full HTML Page including head, title elements. Escriba el contenido anterior con los temas siguientes.    
    1. Actividad temprana.
    Proporcione ejemplos de actividades de juego motivadoras, como una canción de atención, un poco de baile o un juego corto.
    2. Requisitos previos
    3. Tema y Meta
    4. Desarrollo del tema
    - Agilidad e ingenio.
    - operación intelectual
    - inteligencia emocional
    5. Reconecta la actividad
    Esto permite a los estudiantes reconectar su atención al tiempo de clase y prepararlos emocionalmente para el desarrollo de las actividades planificadas.
    6. Actividades de clase
    Las actividades deben estar preparadas y diseñadas para reforzar los nuevos conocimientos aprendidos. Se pueden desarrollar de forma individual o colectiva. Tiene que ser productiva y significativa para promover el desarrollo de habilidades de pensamiento. Recomendamos usar una plataforma educativa para esto.
    7. Evaluación
    Proporcione algunas preguntas de muestra.
    `;

  const generateLessonPlan = async (e: any) => {
    e.preventDefault();
    setGeneratedLessonPlans("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedLessonPlans((prev) => prev + chunkValue);
    }
    scrollToLessonPlans();
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Your Lesson Plan Generator</title>
      </Head>

      <Header />

      <DropDown
        options={gradeLevels}
        selectedOption={gradeLevel}
        setSelectedOption={setGradeLevel}
        label="Grade Level"
      />

      <button onClick={generateLessonPlan}>
        Generate Lesson Plan
      </button>

      {loading ? (
  <LoadingDots color="black" />  // Add color prop here
) : (
  <div ref={lessonPlanRef}>
    {parse(generatedLessonPlans)}
  </div>
)}


      <Footer />
    </div>
  );
};

export default Home;
