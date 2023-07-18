import React, { useState } from "react";
import DropDown from "../components/DropDown";

const Home = () => {
  const [grade, setGrade] = useState("");
  const [area, setArea] = useState("");
  const [subject, setSubject] = useState("");

  const handleGenerateBio = () => {
    // Lógica para generar el plan de lecciones con los filtros seleccionados
  };

  return (
    <div>
      <h1>Generador de Plan de Lecciones</h1>
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
      <button onClick={handleGenerateBio}>Generar Plan de Lecciones</button>
    </div>
  );
};

export default Home;
