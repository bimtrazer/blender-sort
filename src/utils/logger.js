export default function magicLogger (message, obj) {
  if (obj === undefined) {
    console.log(`🧙🏻‍♂️ Magic logger says:\n ${message}`, ' ✅')
    return false
  }
  if (obj === null) {
    console.log(`🧙🏻‍♂️ Magic logger says:\n ${message}`, ' ❌')
    return false
  }
  console.log(`🧙🏻‍♂️ Magic logger says:\n ${message}`, obj)
  return false
}
