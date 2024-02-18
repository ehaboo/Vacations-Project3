class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public imageUrl: string;
    public image: FileList;
    public isLiked: boolean;

    public static destinationValidation = {
        required: { value: true, message: "Missing Destination" },
        minLength: { value: 2, message: "Destination too short" },
        maxLength: { value: 50, message: "Destination too long" }
    }

    public static descriptionValidation = {
        required: { value: true, message: "Missing Description" },
        minLength: { value: 2, message: "Description too short" },
        maxLength: { value: 250, message: "Description too long" }
    }

    public static startDateValidation = {
        required: { value: true, message: "Missing Start Date" },
        min: { value: new Date().toLocaleString(), message: "Start Date Must be Greater than today" }
    }

    public static priceValidation = {
        required: { value: true, message: "Missing Price" },
        min: { value: 1, message: "Price must be positive" },
        max: { value: 10000, message: "Price must be less than 10000" }
    }



    public static startDateEditValidation = {
        required: { value: true, message: "Missing Start Date" },
    }
}

export default VacationModel; 