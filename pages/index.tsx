import Head from "next/head";
import { useState } from "react";
import DropDown, { OptionType } from "../components/DropDown";
import Link from "next/link";
import Header from '../components/Header';
import Footer from '../components/Footer';

const options: OptionType[] = [
  { label: "Elemental", value: "Elemental" },
  { label: "Media", value: "Media" },
  { label: "Superior", value: "Superior" },
  { label: "Bachillerato General Unificado", value: "Bachillerato General Unificado" },
  // Agrega otras opciones según sea necesario...
];

const Home = () => {
  const [subNivel, setSubNivel] = useState<OptionType>(options[0]);
  const [temaLeccion, setTemaLeccion] = useState("");
  const [planGenerado, setPlanGenerado] = useState("");
  const [cargando, setCargando] = useState(false);

  const prompt =
    "Estoy creando una aplicación que genera planes de clase para los estudiantes. Tenemos varios subniveles de estudiantes, como Elemental, Media, Superior, Bachillerato General Unificado... Cada uno tiene su propio tema para crear un plan de clase. Por favor, crea un plan de clase largo y perfecto de acuerdo al subnivel del estudiante y al tema. El subnivel del estudiante es " +
    subNivel.label +
    " y el tema es " +
    temaLeccion +
    `\n. Tu respuesta debe estar formateada usando elementos HTML para facilitar la lectura, incluyendo etiquetas de párrafo, saltos de línea, encabezados y títulos en negrita donde sea aplicable, no es necesario crear una página HTML completa incluyendo los elementos de cabecera y título. Escribe el contenido anterior con los siguientes temas.    
    1. Actividad temprana.
    Proporciona una actividad de activación y enfoque para los estudiantes antes de empezar la clase.
    2. Prerrequisitos
    Proporciona el conocimiento detallado necesario para aprender el tema.
    3. Tema de la clase y Objetivos
    4. Desarrollo del tema
    5. Actividad de reconexión
    Esto permite a los estudiantes reconectar su atención al tiempo de clase y prepararlos emocionalmente para el desarrollo de las actividades planificadas.
    6. Actividades de la clase
    Las actividades deben ser preparadas y diseñadas para reforzar el nuevo conocimiento aprendido. Pueden ser desarrolladas individualmente o colectivamente. Tiene que ser productiva y significativa para promover el desarrollo de las habilidades de pensamiento. Recomendamos usar una plataforma educativa para esto.
    7. Evaluación
    Proporciona algunas preguntas de muestra.
    `;

  const generarPlanLeccion = async (e: any) => {
    e.preventDefault();
    setPlanGenerado("");
    setCargando(true);
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

    const data = await response.json();
    setPlanGenerado(data.generatedBios);
    setCargando(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>PlanMágico</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Genera tu Plan de Lección con Navi AI
        </h1>
        <p className="text-slate-500 mt-5">
          2,118 planes de lección generados hasta ahora.
        </p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium">
              Introduce el tema para tu plan de lección.{" "}
              <span className="text-slate-500"></span>
            </p>
          </div>
          <textarea
            value={temaLeccion}
            onChange={(e) => setTemaLeccion(e.target.value)}
            rows={4}
            className="w-full h-24 mt-3 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <DropDown
            options={options}
            label="Selecciona el subnivel del estudiante"
            selectedValue={subNivel}
            onChange={setSubNivel}
          />
          <button
            onClick={generarPlanLeccion}
            className="w-full mt-6 py-3 bg-blue-600 rounded text-white text-lg font-medium focus:outline-none"
          >
            {cargando ? "Generando..." : "Generar Plan de Lección"}
          </button>
        </div>
        {planGenerado && (
          <div
            className="mt-10 w-full max-w-xl p-5 rounded-md bg-white shadow-lg text-left"
            dangerouslySetInnerHTML={{ __html: planGenerado }}
          ></div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
