function calculateBMI(height: number, weight: number): number {

    height = height / 100; //convert height from cm to meters
    if (height <= 0) {
        throw new Error("Height must be greater than zero.");
    }
    return weight / (height * height);
}

//return classification based on the bmi table
//Severe Thinness	< 16
//Moderate Thinness	16 - 17
//Mild Thinness	17 - 18.5
//Normal	18.5 - 25
//Overweight	25 - 30
//Obese Class I	30 - 35
//Obese Class II	35 - 40
//Obese Class III	> 40
function classifyBMI(bmi: number): string {
    if (bmi < 16) {
        return "Severe Thinness";
    } else if (bmi >= 16 && bmi < 17) {
        return "Moderate Thinness";
    } else if (bmi >= 17 && bmi < 18.5) {
        return "Mild Thinness";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal";
    } else if (bmi >= 25 && bmi < 30) {
        return "Overweight";
    } else if (bmi >= 30 && bmi < 35) {
        return "Obese Class I";
    } else if (bmi >= 35 && bmi < 40) {
        return "Obese Class II";
    } else {
        return "Obese Class III";
    }
}  

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

const bmi = calculateBMI(height, weight);
const classification = classifyBMI(bmi);

console.log(`Your BMI is ${bmi.toFixed(2)} which is classified as: ${classification}`);