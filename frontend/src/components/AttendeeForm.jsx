//import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import { fetchAttendees, createAttendee, deleteAttendee, updateAttendee } from "../api/attendees"
import Button from "./Button";
import styles from "./AttendeeForm.module.scss";

const attl = await fetchAttendees();

const AttendeeForm = () => {

return (      
<Formik
  
  onSubmit={async (values, helpers) => {
    helpers.resetForm({
      values,
    });
  }}

  initialValues={{ attendees: attl}}
> {({ values }) => (
  <Form className={styles.form}>
    <FieldArray
      name="attendees"
      render={arrayHelpers => (
        <div>
          
          <table>
            <tbody>
              <tr>
                <td className={styles.td}><label>Vardas</label></td>
                <td className={styles.td}><label>Pavardė</label></td>
                <td className={styles.td}><label>el.paštas</label></td>
                <td className={styles.td}><label>Amžius</label></td>
              </tr>
            </tbody>
          </table>
              
          {values.attendees.map((attendee, index) => (      
            <div key={index}>
              <Field className={styles.field} name={`attendees.${index}._id`}
                hidden={true}
              />
              <Field className={styles.field} placeholder="Vardas" name={`attendees.${index}.vardas`}/>
              <Field className={styles.field} placeholder="Pavardė" name={`attendees.${index}.pavarde`} />
              <Field className={styles.field} placeholder="el@pastas.lt" type="email" name={`attendees.${index}.el_pastas`} />
              <Field className={styles.field} placeholder="Amžius" name={`attendees.${index}.gimimo_data`} />
              
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
                  updateAttendee(at)
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

export default AttendeeForm;
