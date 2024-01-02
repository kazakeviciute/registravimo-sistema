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
                          //console.log(values.attendees[index]._id);
                          //deleteAttendee(values.attendees[index]._id);


                          var at = new Object(); 
                      at._id = values.attendees[index]._id;
                      at.vardas = "xxx";
                      at.pavarde = "xxx";
                      at.el_pastas = "a@a.lt";
                      at.gimimo_data = "1986-09-06T00:00:00.000Z";
                          updateAttendee(at);
                        }}
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    //onClick={() => arrayHelpers.push({ vardas: "", pavarde: "" })}
                    onClick={() => {
                      console.log('push');
                    
                      var at = new Object(); 
                      at._id = Date.now().toString();
                      at.vardas = "ccc";
                      at.pavarde = "ff";
                      at.el_pastas = "a@a.lt";
                      at.gimimo_data = "1986-09-06T00:00:00.000Z";
                      //var jsonString = JSON.stringify(at);
                      //var at = new attendee();
                      createAttendee(at);
                    }}>
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