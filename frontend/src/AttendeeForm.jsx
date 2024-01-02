import PropTypes from "prop-types";
//import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import { fetchAttendees, createAttendee } from "./api/attendees";

const attl = await fetchAttendees();

const AttendeeForm = ({handleAddAttendee}) => {


  const handleSubmit = async (values) => {
    try {
      const response = await createAttendee(values);
      handleAddAttendee(response);
    } catch (error) {
        console.error(error);
    }
  };
  
  return ( 
     
<Formik
  initialValues={{ attendees:  attl }}
  >
        {({ values }) => (
          <Form>
            <FieldArray
              name="attendees"
              render={arrayHelpers => (
                <div>
                  {values.attendees.map((attendee, index) => (
                    <div key={index}>
                      <Field name={`attendees[${index}].vardas`} />
                      <Field name={`attendees.${index}.pavarde`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ vardas: "", pavarde: "" })}
                  >
                    +
                  </button>
                </div>
              )}
            />
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
  );
};

AttendeeForm.propTypes = {
  handleAddAttendee: PropTypes.func.isRequired,
  //displayAddAttendee: PropTypes.func.isRequired,
}

export default AttendeeForm;