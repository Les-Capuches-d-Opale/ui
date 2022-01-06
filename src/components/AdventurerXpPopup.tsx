import { SetStateAction, useState } from 'react';
import { Button, Modal, Input } from 'react-rainbow-components';
import request from '../axios'

interface Props {
    adventurerId: string
}

const h3Styles = {
    TextAlign: 'center',
    fontSize: '32px',
    fontWeigth: 'bold'
};
const inputStyles = {
    width: '80%',
};

const AdventurerXpPopup = ({adventurerId="61bf9b9b0be9cf45263b6f2d"}: Props) => {
    const [isOpen, setOpen] = useState(false)
    const [xpValue, setXpValue] = useState(0)

    const openXpPopup = () => {
        setOpen(true)
    }

    const closeXpPopup = () => {
        setOpen(false)
    }

    const updateXpValue = (e: number) => {
        setXpValue(e)
    }

    const updateXp = async () => {
        await request.put(`https://les-capuches-d-opale.herokuapp.com/adventurers/${adventurerId}`, {experience: xpValue})
        setOpen(false)
    }

    return (
        <div>
            <Button
                variant="neutral"
                label="Modifier"
                onClick={openXpPopup}
            />
            <Modal isOpen={isOpen} onRequestClose={closeXpPopup}>
                <h3 style={h3Styles}>EXP</h3>
                <Input
                    type="number"
                    placeholder="EXP"
                    style={inputStyles}
                    className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                    value={xpValue}
                    onChange={(e) => updateXpValue(Number(e.target.value))}
                />
                <Button
                    variant="success"
                    label="Modifier"
                    onClick={updateXp}
                />
            </Modal>
        </div>
    )
}

export default AdventurerXpPopup