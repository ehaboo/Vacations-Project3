import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useTitle from "../../../Hooks/useTitle";
import VacationModel from "../../../Models/VacationModel";
import "./EditVacation.css";
import vacationService from "../../../Services/VacationsService";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import useVerifyLoggedIn from "../../../Hooks/useVerifyLoggedIn";
import notifyService from "../../../Services/NotifyService";


function EditVacation(this: any): JSX.Element {
    useTitle("Edit Vacation");
    const user = useVerifyLoggedIn();
    const params = useParams();
    const navigate = useNavigate();


    const [imageUrl, setImageUrl] = useState("");
    const { register, handleSubmit, formState, setValue, getValues } = useForm<VacationModel>();

    useEffect(() => {
        const { vacationId } = params;
        vacationService.getOneVacation(+vacationId)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", vacation.startDate);
                setValue("endDate", vacation.endDate);
                setValue("price", vacation.price);
                setValue("isLiked", vacation.isLiked)
                setImageUrl(vacation.imageUrl)
            })
            .catch(error => notifyService.error(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const update = async (vacation: VacationModel) => {
        try {
            await vacationService.updateVacation(vacation);
            notifyService.success(`${vacation.destination} Vacation Successfully Updated...`); 
            navigate("/vacations");
        } catch (error: any) {
            notifyService.error(error); 
        }
    }

    const endDateValidation = {
        required: { value: true, message: "Missing End Date" },
        min: { value: new Date(getValues("startDate")).toLocaleString(), message: "End Date Must be Greater than Start Date" }
    }

    const cancelUpdate = (e:SyntheticEvent) => {
        e.preventDefault()
        window.scrollTo(0, 0);
        navigate("/vacations");
    }


    function handelImage(e:ChangeEvent<HTMLInputElement>) {
        
        const file = e.target.files[0];

        if (file) {
    
          const reader = new FileReader();
          reader.onload = () => {
            setImageUrl(reader.result as string);
            
          };
          reader.readAsDataURL(file);
        }
        
    }

    return (
        <div className="EditVacation">
            {user?.userId === 1 ?
                <div className="container">
                    <form className="form" onSubmit={handleSubmit(update)}>
                        <div className="form_front">
                            <div className="form_details">Edit Vacation</div>
                            <input className="input" type="text" placeholder="Destination" {...register("destination", VacationModel.destinationValidation)} />
                            <span className="err">{formState.errors.destination?.message}</span>
                            <textarea className="input" placeholder="Description" rows={6} {...register("description", VacationModel.descriptionValidation)} />
                            <span className="err">{formState.errors.description?.message}</span>
                            <label>Start on </label>
                            <input className="input" type="date" {...register("startDate", VacationModel.startDateEditValidation)} />
                            <span className="err">{formState.errors.startDate?.message}</span>
                            <label>End on </label>
                            <input className="input" type="date" {...register("endDate", endDateValidation)} />
                            <span className="err">{formState.errors.endDate?.message}</span>
                            <input className="input" type="file" accept="image/*" {...register("image", {onChange:e => handelImage(e)})} />
                            {imageUrl && <img className="input" src={imageUrl} alt="" />}
                            <input className="input" step="0.01" type="number" placeholder="Price" {...register("price", VacationModel.priceValidation)} />
                            <span className="err">{formState.errors.price?.message}</span>

                            <button className="btn pointer">Update</button>
                            <button className="btn pointer" onClick={cancelUpdate}>Cancel</button>
                        </div>
                    </form>
                </div>
                :
                <Navigate to="/vacations" />
            }
        </div>
    );
}

export default EditVacation;
