const QUESTIONS = [
  {
    text: 'Selecione a banana',
    options: [
      { icon: '' },
      { icon: '' },
      { icon: '' },
      { icon: '' },
    ],
    correct: 3
  },
  {
    text: 'Selecione a uva',
    options: [
      { icon: '' },
      { icon: '' },
      { icon: '' },
      { icon: '' },
    ],
    correct: 3
  },
]

let question = 1
let selected = null

/**
 * Selects an answer option in the quiz and updates the UI state
 *
 * @param {number} index - The index of the selected option.
 *
 * @returns {void}
 *
 * @example
 * select(2)
 */
function select(index) {
  // TODO: set `data-state="selected"` for the given option
}


/**
 * Checks whether the currently selected option is correct and updates
 * the UI state to either success or error.
 *
 * If no option is currently selected, the function does nothing.
 * 
 * @returns {void}
 *
 * @example
 * select(3)
 * check()
 */
function check() {
  if (!selected) {
    return
  }
}
