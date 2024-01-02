import PropTypes from "prop-types";
//import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import { fetchAttendees, createAttendee, deleteAttendee, updateAttendee } from "./api/attendees";

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
                      <Field name={`attendees.${index}._id`} />
                      <Field name={`attendees.${index}.vardas`} />
                      <Field name={`attendees.${index}.pavarde`} />
                      <Field type="email" name={`attendees.${index}.el_pastas`} />
                      <Field name={`attendees.${index}.gimimo_data`} />
                      <button
                        type="button"
                        //onClick={() => arrayHelpers.remove(index)}
                        onClick={() => {
                          deleteAttendee(values.attendees[index]._id);
                        }}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        //onClick={() => arrayHelpers.remove(index)}
                        onClick={() => {
                          var at = new Object(); 
                          at._id = values.attendees[index]._id;
                          at.vardas = values.attendees[index].vardas;
                          at.pavarde = values.attendees[index].pavarde;
                          at.el_pastas = values.attendees[index].el_pastas;
                          at.gimimo_data = values.attendees[index].gimimo_data;
                          updateAttendee(at);
                        }}
                      >
                        u
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          var at = new Object(); 
                          at._id = values.attendees[index]._id;
                          at.vardas = values.attendees[index].vardas;
                          at.pavarde = values.attendees[index].pavarde;
                          at.el_pastas = values.attendees[index].el_pastas;
                          at.gimimo_data = values.attendees[index].gimimo_data;
                          createAttendee(at);
                        }}
                      >
                        a
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ _id:Date.now().toString(), vardas: "", pavarde: "", el_pastas: "", gimimo_data: "" })}                      
                    >
                    +
                  </button>
                </div>
              )}
            />
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