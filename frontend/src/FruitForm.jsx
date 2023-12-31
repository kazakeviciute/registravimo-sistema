import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import { createFruit } from './api/fruits';

const FruitForm = ({handleAddFruit}) => {
  const handleSubmit = async (values) => {
    try {
      const response = await createFruit(values);
      handleAddFruit(response);
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
      <Form>
        <Field name="name" placeholder="įvesk vaisių..."/>
        <button type="submit">Submit fruit</button>
      </Form>
    </Formik>
  );
};

export default FruitForm;