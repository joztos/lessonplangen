function App() {
  const niveles: OptionType[] = [
    { label: "Elemental", value: "elemental" },
    { label: "Media", value: "media" },
    { label: "Superior", value: "superior" },
    { label: "Bachillerato General Unificado", value: "bachillerato" },
  ];

  const otrosFiltros: OptionType[] = [
    { label: "Opción 1", value: "1" },
    { label: "Opción 2", value: "2" },
    { label: "Opción 3", value: "3" },
    // más opciones...
  ];

  const [nivelSeleccionado, setNivelSeleccionado] = useState(niveles[0]);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(otrosFiltros[0]);

  return (
    <div>
      <DropDown 
        options={niveles} 
        selectedOption={nivelSeleccionado} 
        setSelectedOption={setNivelSeleccionado} 
      />
      <DropDown 
        options={otrosFiltros} 
        selectedOption={filtroSeleccionado} 
        setSelectedOption={setFiltroSeleccionado} 
      />
      {/* resto de tu código... */}
    </div>
  );
}
