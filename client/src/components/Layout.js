import { Navbar } from "./Navbar"
import { Wrapper } from "./Wrapper"

export const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Wrapper>{children}</Wrapper>
        </>
    )
}