import PropTypes from "prop-types";
//import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import { fetchAttendees, createAttendee, deleteAttendee, updateAttendee } from "../api/attendees"
import Button from "../components/Button";

const attl = await fetchAttendees();

function handleS() {
    console.log('submit');
}

const AttendeeForm = ({handleAddAttendee}) => {
  /*
  const handleSubmit = async (values) => {
    try {
      const response = await createAttendee(values);
      handleAddAttendee(response);
      console.log('submit');
    } catch (error) {
      console.error(error);
    }
  };
  */

return (      
<Formik
  enableReinitialize={true}
  onSubmit={handleS}
  initialValues={{ attendees: attl}}
> {({ values }) => (
  <Form>
    <FieldArray
      name="attendees"
      render={arrayHelpers => (
        <div>
          {values.attendees.map((attendee, index) => (      
            <div key={index}>
              <Field name={`attendees.${index}._id`}
                hidden={true}
              />
              <Field name={`attendees.${index}.vardas`}
                //inputprops={{onchange:  ? console.log('eee') : true }}
                // onChange={ console.log('eee') }
              />
              <Field name={`attendees.${index}.pavarde`} />
              <Field type="email" name={`attendees.${index}.el_pastas`} />
              <Field name={`attendees.${index}.gimimo_data`} />

              <Button
                type="button"
                onClick={() => {
                  deleteAttendee(values.attendees[index]._id);
                  arrayHelpers.remove(index);
                }}>
                remove     
              </Button>

              <Button
                type="submit"
                hidden={values.attendees[index].p_new}
                onClick={() => {
                  var at = new Object(); 
                  at._id = values.attendees[index]._id;
                  at.vardas = values.attendees[index].vardas;
                  at.pavarde = values.attendees[index].pavarde;
                  at.el_pastas = values.attendees[index].el_pastas;
                  at.gimimo_data = values.attendees[index].gimimo_data;
                  updateAttendee(at);
                }}>
                update
              </Button>

              <Button
                type="submit"
                hidden={!values.attendees[index].p_new}
                onClick={() => {
                  var at = new Object(); 
                  at._id = values.attendees[index]._id;
                  at.vardas = values.attendees[index].vardas;
                  at.pavarde = values.attendees[index].pavarde;
                  at.el_pastas = values.attendees[index].el_pastas;
                  at.gimimo_data = values.attendees[index].gimimo_data;
                  at.p_new = false;
                  createAttendee(at);            
                }}>
                add
              </Button>

            </div>
            ))}

            <Button
              type="button"
              onClick={() => {
                arrayHelpers.push({ _id:Date.now().toString(), vardas: "", pavarde: "", el_pastas: "", gimimo_data: "", p_new: true });
              }}>
              new
            </Button>
          </div>
          )}/>
        </Form>
      )} 
      </Formik>
    );
};

AttendeeForm.propTypes = {
  handleAddAttendee: PropTypes.func.isRequired,
}

export default AttendeeForm;
