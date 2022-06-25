import { Button, Offcanvas, Stack } from "react-bootstrap";
import { Controls } from "./Controls";
import { GameSettings } from "./GameSettings";
import { PlayerSettings } from "./PlayerSettings";

interface Props {
    show: boolean;
    handleClose(): void;
}

export function SettingsSideBar(props: Props) {
    const onHide = async () => {
        props.handleClose();
    };

    return (
        <Offcanvas show={props.show} onHide={onHide}>
            <Offcanvas.Header className="border-bottom mb-4">
                <h3 className="offcanvas-title">
                    <i className="bi bi-gear me-3"></i>Settings
                </h3>
                <Button variant="close" onClick={onHide}></Button>
            </Offcanvas.Header>
            <Offcanvas.Body className="pt-0">
                <Stack direction="vertical" gap={4}>
                    <PlayerSettings />
                    <GameSettings />
                    <Controls />
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
