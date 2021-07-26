import React from "react"
import App from "./App";
import {render, fireEvent} from "@testing-library/react";
import SignUp from "./screens/signup/Signup";
import {shallow} from "enzyme";
import { mount } from "enzyme/build";
import Home from "./screens/home/home";

const wrapper = shallow(<SignUp />);

// const simulateChangeInput = (wrapper, inputSelector, newValue) => {
//     const input = wrapper.find(inputSelector)
//     input.simulate('change', {
//         target: { value:  newValue},
//     })
//     return wrapper.find(inputSelector) 
// }
describe("rendering component", () => {
    it("renders App component", () => {
        shallow(<App />);
    })
    it("check signup button",() => {
        const label = wrapper.find("#button").text();
        expect(label).toEqual("SignUp");
    })
    it("check textfield ", () => {
        const {queryByTitle} = render(<SignUp />)
        const text = queryByTitle("firstName")
        expect(text).toBeTruthy();
    })
    // it("onchnage check in textfield", () => {
    //     const {queryByTitle} =  render(<SignUp />)
    //     const input = queryByTitle("firstName")
    //     fireEvent.change(input,{target : {value : "Allah"}})
    //     expect(input.value).toHaveValue("Allah")
    // })
    // it("lets me fill the textfield in mui", () => {
    //     const updateInput = simulateChangeInput(wrapper, '#firstName','Allah')
    //     expect(updateInput.props().value).toEqual("Allah")
    // })
    it('validates model on button click', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(
            <SignUp handleSubmit={handleSubmit}/>
        );
        const instance = wrapper.instance();
        const submitBtn = wrapper.find('#button')
        submitBtn.simulate('click')
        expect(handleSubmit).toHaveBeenCalled();
      });
})

describe("check home page" , () => {
    it("check img tag",() => {
        const wrapper1 = shallow(<Home />);
        console.log(wrapper1.debug());
        expect(wrapper1.find("p").text()).toContain("Allah")
    })
})

