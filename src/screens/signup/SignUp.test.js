import {render, fireEvent} from "@testing-library/react";

import SignUp from "./Signup";

it("checkButtonRender",() => {
    const {queryByTitle} = render(<SignUp />)
    const btn = queryByTitle("button")
    expect(btn).toBeTruthy()
})