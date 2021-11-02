export default {
  getQueryString (parameter: string): string|null {
    return new URL(window.location.href).searchParams.get(parameter)
  }
}
