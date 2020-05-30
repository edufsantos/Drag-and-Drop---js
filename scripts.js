const cards = document.querySelectorAll('.card')
const dropzones = document.querySelectorAll('.dropzone')

function log(message){
  return console.log('>'+message);
}

cards.forEach(card => {
  card.addEventListener('dragstart', dragstart)
  card.addEventListener('drag', drag)
  card.addEventListener('dragend', dragend)
})

function dragstart() {
  dropzones.forEach( dropzone => dropzone.classList.add('highlight'))

  this.classList.add('is-dragging')
}

function drag() {
}

function dragend() {
  dropzones.forEach( dropzone => dropzone.classList.remove('highlight'))

  this.classList.remove('is-dragging')
}


dropzones.forEach( dropzone => {
  
  dropzone.addEventListener('dragover',e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(dropzone, e.clientY)
    const draggable = document.querySelector('.is-dragging')
    if (afterElement == null) {
      dropzone.appendChild(draggable)
    } else {
      dropzone.insertBefore(draggable, afterElement)
    }
  });



})



function getDragAfterElement(dropzone, y) {
  const draggableElements = [...dropzone.querySelectorAll('.card:not(.is-dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}


function dragleave() {
  // log('DROPZONE: Leave ')
  // this = dropzone
  this.classList.remove('over')

}

function drop() {
  // log('DROPZONE: dropped ')
  this.classList.remove('over')
}