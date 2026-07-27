const months = [
  { value: "01", name: "Janeiro" },
  { value: "02", name: "Fevereiro" },
  { value: "03", name: "Março" },
  { value: "04", name: "Abril" },
  { value: "05", name: "Maio" },
  { value: "06", name: "Junho" },
  { value: "07", name: "Julho" },
  { value: "08", name: "Agosto" },
  { value: "09", name: "Setembro" },
  { value: "10", name: "Outubro" },
  { value: "11", name: "Novembro" },
  { value: "12", name: "Dezembro" },
]

const days = Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, "0"))

const MINIMUM_AGE = 18
const OLDEST_AGE = 100

const years = () => {
  const currentYear = new Date().getFullYear()
  const maxYear = currentYear - MINIMUM_AGE
  const minYear = currentYear - OLDEST_AGE
  const list = []

  for (let year = maxYear; year >= minYear; year--) list.push(String(year))

  return list
}

export { months, days, years }
