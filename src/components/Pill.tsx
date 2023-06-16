import React, { useState } from 'react'
import { Button, Input, Box } from '@chakra-ui/react'
import { Coordinates } from '@/constant/types'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'

interface PillProps {
    pointerPosition: Coordinates,
    cameraZoom: number,
    moveToPoint: (x: number, y: number) => void
}

const Pill = ({ pointerPosition, cameraZoom, moveToPoint }: PillProps) => {
    const [isSearchMode, setSearchMode] = useState(false);
    const [searchInputs, setSearchInputs] = useState({ x: 0, y: 0 })

    const onToggleSearch = () => {
        setSearchInputs({ x: pointerPosition ? pointerPosition.x : 0, y: pointerPosition ? pointerPosition.y : 0 });
        setSearchMode(true);
    }

    const onInputXChange = (e) => {
        if (isNaN(e.target.value)) return;
        if (!Number.isInteger(Number(e.target.value))) return;

        setSearchInputs(pInput => { return { x: e.target.value, y: pInput.y } });
    }

    const onInputYChange = (e) => {
        if (isNaN(e.target.value)) return;
        if (!Number.isInteger(Number(e.target.value))) return;

        setSearchInputs(pInput => { return { x: pInput.x, y: e.target.value } });
    }

    const onSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        moveToPoint(searchInputs.x, searchInputs.y);
        setSearchMode(false);
    }

    const Coordinates = <>
        <div className='mr-2' style={{ alignSelf: 'center ', whiteSpace: 'nowrap' }}>({pointerPosition ? pointerPosition.x : -1} , {pointerPosition ? pointerPosition.y : -1}) : {cameraZoom.toFixed(2)}x </div>
        <Button px={0} variant={"ghost"} onClick={onToggleSearch}><SearchIcon /></Button>
    </>

    const SearchBar = <>
        <form style={{ display: 'flex', flexDirection: 'row', gap: '0.5em', alignItems: 'center' }}>
            <Input id="x" name="x" width="70px" inputMode='numeric' type='text' value={searchInputs.x} onChange={onInputXChange} style={{ backgroundColor: 'transparent', outline: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield' }} />
            <Input id="y" name="y" width="70px" inputMode='numeric' type='text' value={searchInputs.y} onChange={onInputYChange} style={{ backgroundColor: 'transparent', outline: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield' }} />
            <Button px={0} variant={"ghost"} type="submit" onClick={onSearch}><SearchIcon /></Button>
        </form>
        <Button px={0} variant={"ghost"} onClick={() => { setSearchMode(false) }} style={{ alignSelf: 'center' }}><CloseIcon /></Button>
    </>

    return (
        <Box id='coordinatesPill' bg="purple.500" className="rounded-full font-semibold text-md bg-cyan-500 text-white py-2 px-4" style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)', border: '2px solid white', filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3))',
            display: 'flex', flexDirection: 'row', bottom: '10px'
        }}>
            {isSearchMode ? SearchBar : Coordinates}
        </Box>
    )
}

export default Pill;