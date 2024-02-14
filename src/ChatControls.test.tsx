import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatControls from "./ChatControls";

let fillerApp = () => {};

test('Renders without issue', () => {
    let componentText = "Below you can change ChatGPTs personality via a system call."
    render(<ChatControls
        sendChatToApp={fillerApp}
        sendPersonalityToApp={fillerApp}
        personality={""}
    />);
    const testElement = screen.getByText(new RegExp(componentText, "i"));
    expect(testElement).toBeInTheDocument();
});

test('Personality string is present in text box', () => {
    let personalityString = "Test Personality."
    render(<ChatControls
        sendChatToApp={fillerApp}
        sendPersonalityToApp={fillerApp}
        personality={personalityString}
    />);
    const testElement = screen.getByDisplayValue(personalityString);
    expect(testElement).toBeInTheDocument();
});