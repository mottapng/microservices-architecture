export type Result<T, E = Error> = {
  success: boolean
  data?: T
  error?: E
}
