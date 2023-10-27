function listenerNumSections(event) {
  let numSelected = Number(event.key)
  let index = numSelected - 1
  let sections = document.querySelectorAll('section')
  let section = sections[index]
  section.scrollIntoView()
}

document.addEventListener('keypress', listenerNumSections)

let form = document.querySelector('form')
form.addEventListener('keypress', (event) => {
  event.stopPropagation()
})