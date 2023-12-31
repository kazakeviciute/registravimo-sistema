import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';

const FruitForm = () => {

const handleSubmit = async (values) => {
  console.log(values);
}
    return (
       <Formik initialValues={{name: ""}} onSubmit={handleSubmit}>
        <Form>
            <Field name="name" placeholder="įvesk vaisių..."/>
            <button type="submit">Submit fruit</button>
        </Form>
       </Formik>
    )
}

export default FruitForm