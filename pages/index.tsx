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
  const [generatedBios, setGeneratedBios] = useState<string>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    console.log(generatedBios);
  }, [generatedBios]);

  const prompt = "I am creating an app that generates class plans for students. We have various student grade levels, such as First Grade, Second Grade.. All of them have their own theme for creating a class plan. Please, create a long and perfect class plan according to the student's grade level and the theme. The student's grade is " + grade + " the theme is " + bio + " the area of study is " + area + " and the subject is " + subject + "\n. Your response must be formatted using HTML Elements for easier readability, including paragraph tags, line breaks, headings and bold titles where applicable, no need to create Full HTML Page including head, title elements. Write the previous content with the following topics. 1. Early activity. Provide an activation and focus activity for the students before starting the class. 2. Prerequisites Provide the detailed knowledge required to learn the topic. 3. Class Theme and Objectives 4. Development of the Theme 5. Reconnect Activity This allows the students to reconnect their attention to class time and prepare them emotionally for the development of the planned activities. 6. Class Activities The activities should be prepared and designed to reinforce the new knowledge learned. They can be developed individually or collectively. It has to be productive and meaningful to promote the development of thinking skills. We recommend using an educational platform for this. 7. Assessment Provide some sample questions.";

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
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
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>MagicPlan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://samasat.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p></p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Generate your Lesson Plan with Navi AI
        </h1>
        <p className="text-slate-500 mt-5">
          2,118 lesson plans generated so far.
        </p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Enter the topic for your lesson plan.{" "}
              <span className="text-slate-500"></span>
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"For example, the cells of the human body"}
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">
              Select the School Grade.
            </p>
          </div>
          <div className="block">
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
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Generate Lesson Plan &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {parse(generatedBios)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
