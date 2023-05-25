import styled from "styled-components"

const Container = styled.div`
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 1000;
    background-color: #eee;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 1.2rem;
`

const Row = styled.div`
    display: flex;
`

const MenuItem = styled.div<{ isactive: boolean, isleft: boolean }>`
    color: ${props => props.isactive ? 'white' : 'black'};
    padding: 5px 10px;
    background-color: ${props => props.isactive ? '#222' : '#bbb'};
    border-radius: ${props => props.isleft ? '5px 0 0 5px' : '0 5px 5px 0'};
    cursor: pointer;
`

const Label = styled.p`
    margin-bottom: 0.5rem;
    font-weight: 700;
`

import { useState } from "react";
import { Mode } from "@/constant/types"

export function FloatingMenu({ mode, toggleMode }: { mode: Mode, toggleMode: () => void }) {
    return <Container>
        <Label>Select Mode</Label>
        <Row>
            <MenuItem onClick={() => toggleMode()} isactive={mode === "Block"} isleft={true}>Block</MenuItem>
            <MenuItem onClick={() => toggleMode()} isactive={mode !== "Block"} isleft={false}>Pixel</MenuItem>
        </Row>
    </Container>
}