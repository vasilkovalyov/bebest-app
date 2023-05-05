import Link from 'next/link'
import Image from 'next/image'

function Header() {
  return (
    <header>
      <div>
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt={'bebest logo'}
            width={100}
            height={30}
          />
        </Link>
      </div>
      <nav>
        <ul>
          <li></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
