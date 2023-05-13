class CookiesService {
  parseCookies(name: string): string {
    const cookiesArr = document.cookie.split(';')
    if (!cookiesArr.length) return ''

    for (let i in cookiesArr) {
      const item = cookiesArr[i]
      if (item.startsWith(`${name}=`)) {
        return item.split('=')[1]
      }
    }

    return ''
  }
}

const cookiesService = new CookiesService()

export default cookiesService
