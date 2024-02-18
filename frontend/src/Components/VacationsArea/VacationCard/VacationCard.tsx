import { useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import Following from "../Following/Following";
import "./VacationCard.css";
import useVerifyLoggedIn from "../../../Hooks/useVerifyLoggedIn";
import deleteIcon from "../../../Assets/images/delete-icon.png";
import editIcon from "../../../Assets/images/edit-icon.png"
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


interface VacationCardProps {
    vacation: VacationModel;
    onDelete: (vacationId: number) => void
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const user = useVerifyLoggedIn();

    const [isFollowed, setIsFollowed] = useState<boolean>(props.vacation.isLiked);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="VacationCard" style={isFollowed ? { border: '1px solid #3EFF00' } : { border: '1px solid #FF0900' }}>
                <div className="banner-image" style={{ backgroundImage: `url(${props.vacation.imageUrl})` }}>
                    {user.roleId !== 1
                        ?
                        <Following onChanging={setIsFollowed} vacationId={props.vacation.vacationId} isLiked={props.vacation.isLiked} />
                        :
                        <div className="relativeDiv">
                            <div className="controlBtn">
                                <Link className="pointer" to={"/vacations/edit-vacation/" + props.vacation.vacationId}><img src={editIcon} alt="" /></Link>
                                <Link to={"/vacations"} className="pointer" onClick={handleClickOpen}><img src={deleteIcon} alt="" /></Link>
                            </div>
                            <Dialog className="dialogContainer"
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                PaperProps={{
                                    style: {
                                        borderRadius: '6px', 
                                        backgroundColor: '#111827',
                                        color: 'aqua',
                                        width: '440px',
                                    },
                                    sx: {
                                        button:{
                                            color:'#06b6d4',
                                            transitionDuration: '0.2s',
                                            flex: '1 1 auto', 
                                            fontWeight: '700', 
                                            backgroundColor: 'transparent',
                                            borderColor: "transparent",
                                            border: "1px solid"
                                        },
                                        h2:{
                                            fontSize: 'large',
                                        }
                                    },
                                }}
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {`Do you want to delete ${props.vacation.destination} vacation?`}
                                </DialogTitle>
                                <DialogActions>
                                    <Button className="dialogBtn" onClick={() => { props.onDelete(props.vacation.vacationId) }}>Delete</Button>
                                    <Button className="dialogBtn" onClick={handleClose}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    }
                </div>
                <div className="infoBox">
                <h1>{props.vacation.destination}</h1>
                <p>📆 {new Date(props.vacation.startDate).toLocaleDateString('en-GB')} - {new Date(props.vacation.endDate).toLocaleDateString('en-GB')}</p>
                <p>{props.vacation.description}</p>
                </div>

                <div className="btn outline">$ {props.vacation.price}</div>
        </div>
    );
}

export default VacationCard;
