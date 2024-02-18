import { useForm } from "react-hook-form";
import useTitle from "../../../Hooks/useTitle";
import "./AddVacation.css";
import VacationModel from "../../../Models/VacationModel";
import { Navigate, useNavigate } from "react-router-dom";
import vacationService from "../../../Services/VacationsService";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import useVerifyLoggedIn from "../../../Hooks/useVerifyLoggedIn";
import AdminMenu from "../../MenuArea/AdminMenu/AdminMenu";
import notifyService from "../../../Services/NotifyService";

function AddVacation(): JSX.Element {
    useTitle("Add Vacation");
    const user = useVerifyLoggedIn();
    const navigate = useNavigate();


    const { register, handleSubmit, formState, getValues } = useForm<VacationModel>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);


    const save = async (vacation: VacationModel) => {
        try {
            await vacationService.addVacation(vacation);
            notifyService.success("New Vacation Successfully Added...");
            navigate("/vacations")

        } catch (error: any) {
            notifyService.error(error);
        }
    }

    const cancelAdd = (e:SyntheticEvent) => {
        e.preventDefault()
        window.scrollTo(0, 0);
        navigate("/vacations");
    }

    const endDateValidation = {
        required: { value: true, message: "Missing End Date" },
        min: { value: new Date(getValues("startDate")).toLocaleString(), message: "End Date Must be Greater than Start Date" }
    }

    function handelImage(e:ChangeEvent<HTMLInputElement>) {
        
        const file = e.target.files[0];

        if (file) {
    
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewUrl(reader.result as string);
            
          };
          reader.readAsDataURL(file);
        } else {
          setPreviewUrl(null);
          
        }
        
    }



    return (
        <div className="AddVacation">
            {user?.userId === 1 ?
                <>
                    <AdminMenu />
                    <div className="container">
                        <form className="form" onSubmit={handleSubmit(save)}>
                            <div className="form_front">
                                <div className="form_details">Add Vacation</div>
                                <input className="input" type="text" placeholder="Destination" {...register("destination", VacationModel.destinationValidation)} />
                                <span className="err">{formState.errors.destination?.message}</span>
                                <textarea className="input" placeholder="Description" rows={6} {...register("description", VacationModel.descriptionValidation)} />
                                <span className="err">{formState.errors.description?.message}</span>
                                <label>Start on </label>
                                <input className="input" type="date" {...register("startDate", VacationModel.startDateValidation)} />
                                <span className="err">{formState.errors.startDate?.message}</span>
                                <label>End on </label>
                                <input className="input" type="date" {...register("endDate", endDateValidation)} />
                                <span className="err">{formState.errors.endDate?.message}</span>
                                <input className="input"  type="file" accept="image/*" {...register("image", {onChange: e=> handelImage(e), required:{value: true, message: "Missing Image"}})} />
                                <span className="err">{formState.errors.image?.message}</span>
                                {previewUrl && <img className="input" src={previewUrl as string} alt="" />}
                                <input className="input" step="0.01" type="number" placeholder="Price" {...register("price", VacationModel.priceValidation)} />
                                <span className="err">{formState.errors.price?.message}</span>

                                <button className="btn pointer">Add</button>
                                <button className="btn pointer" onClick={cancelAdd}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </>
                :
                <Navigate to="/vacations" />
            }
        </div>
    );
}

export default AddVacation;
