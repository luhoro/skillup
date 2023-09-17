
import Link, {LinkProps} from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, cloneElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement 
  activeClassName?: string
}

const ActiveLink = ({ children, activeClassName, ...rest }: ActiveLinkProps) => {
  const { asPath } = useRouter()

  const className = asPath === rest.href ? activeClassName : ''
  //se a rota/página que for acessada for igual ao link clicado, ativar o classname

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className
      })}

    </Link>
  )
}

export default ActiveLink