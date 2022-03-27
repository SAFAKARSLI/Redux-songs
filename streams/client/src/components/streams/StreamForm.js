import React from "react";
import {Field, reduxForm} from 'redux-form';


class StreamForm extends React.Component {

    renderError({error, touched}) {
        if(touched && touched) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }

    }

    renderInput = ({input, label, meta}) => {
        // return <input 
        //     onChange={formProps.input.onChange}
        //     value={formProps.input.value}
        // />

        // SHORTENED SYNTAX!!!
        // return <input {...input} />

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input}/>
                <div>{this.renderError(meta)}</div>
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field 
                    name="title" 
                    component={this.renderInput} 
                    label="Enter a Title"/>
                <Field 
                    name="description" 
                    component={this.renderInput}
                    label="Enter a Description"/>
                <button className="ui primary button">Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {}

    if(!formValues.title) {
        errors.title = "You must enter a title";
    } else if(!formValues.description) {
        errors.description = "You must enter a description";
    }

    return errors;
} 

export default reduxForm({
    form: "streamForm",
    validate
})(StreamForm);
