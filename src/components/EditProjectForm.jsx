import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import { UPDATE_PROJECT } from '../mutations/projectMutation'

const EditProjectForm = ({ project }) => {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    status: 'new',
  })
  const handleChange = (e) => {
    switch (e.target.id) {
      case 'name':
        setFormData({ ...formData, name: e.target.value })
        break
      case 'description':
        setFormData({ ...formData, description: e.target.value })
        break
      case 'status':
        setFormData({ ...formData, status: e.target.value })
        break

      default:
        break
    }
  }

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name: formData.name,
      description: formData.description,
      status: formData.status,
    },
    refetchQueries: [{ query: GET_PROJECT }],
  })

  const onSubmit = (e) => {
    e.preventDefault()
    if (
      formData.name === '' ||
      formData.description === '' ||
      formData.status === ''
    ) {
      return alert('Please fill in all fields')
    }
    updateProject()
  }

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
export default EditProjectForm
