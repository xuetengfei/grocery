import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input } from 'antd';
import merge from 'lodash/merge';
import isArray from 'lodash/isArray';

const transform = obj => {
  return Object.keys(obj).reduce((acc, cv) => {
    return {
      ...acc,
      [cv]:
        typeof obj[cv] === 'object' && !('value' in obj[cv])
          ? isArray(obj[cv])
            ? obj[cv].map(item => transform(item))
            : transform(obj[cv])
          : Form.createFormField({
              ...obj[cv],
              value: obj[cv].value,
            }),
    };
  }, {});
};

const CustomizedForm = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    const { user } = props;
    const transformed = transform({ user });
    return transformed;
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="inline">
      <Form.Item label="Username">
        {getFieldDecorator('user.username', {})(<Input />)}
        {getFieldDecorator('user.password', {})(<Input />)}
        {getFieldDecorator('user.children[0].name', {})(<Input />)}
        {getFieldDecorator('user.children[1].name', {})(<Input />)}
      </Form.Item>
    </Form>
  );
});

class Demo extends React.Component {
  state = {
    fields: {
      user: {
        username: {
          value: 'username',
        },
        password: {
          value: 'password',
        },
        children: [
          {
            name: {
              value: 'name1',
            },
          },
          {
            name: { value: 'name2' },
          },
        ],
      },
    },
  };

  handleFormChange = changedFields => {
    this.setState(({ fields }) => {
      console.log('DEBUG fields', fields);
      console.log('DEBUG changedFields', changedFields);
      return {
        // fields: { ...fields, ...changedFields }
        fields: merge(fields, changedFields),
      };
    });
  };

  render() {
    const fields = this.state.fields;
    return (
      <div>
        <CustomizedForm {...fields} onChange={this.handleFormChange} />
        <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('container'));
