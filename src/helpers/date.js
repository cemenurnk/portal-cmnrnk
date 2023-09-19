export const formatDate = (date) => date.split("-").reverse().join("/")

export const formatDateTime = (datetime) => {
  const [date, time] = datetime.split(" ")

  return formatDate(date)+" "+time.substr(0, 5)+"hs"
}