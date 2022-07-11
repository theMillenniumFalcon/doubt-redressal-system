import Image from 'next/image'

import MyLogo from '../public/javascript.png'

export const Logo = () => {
    return (
        <Image
            src={MyLogo}
            alt=""
            width="50px"
            height="50px"
            placeholder="blur"
            loading="lazy"
        />
    )
}