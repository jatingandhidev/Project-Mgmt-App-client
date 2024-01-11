import { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import { ADD_PROJECT } from '../mutations/projectMutation'
import { GET_CLIENTS } from '../queries/clientQueries'

const AddProjectModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clientId: '',
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
      case 'clientId':
        setFormData({ ...formData, clientId: e.target.value })
        break
      default:
        break
    }
  }

  //   Add project
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: formData.name,
      description: formData.description,
      status: formData.status,
      clientId: formData.clientId,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS })
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      })
    },
  })

  //   get clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS)
  const onSubmit = (e) => {
    e.preventDefault()
    if (
      formData.name === '' ||
      formData.description === '' ||
      formData.status === ''
    ) {
      return alert('Please fill in all fields')
    }
    addProject()
    setFormData({
      name: '',
      description: '',
      clientId: '',
      status: 'new',
    })
  }

  if (loading) return null
  if (error) return 'Something went wrong'

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <span>New Project</span>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProjectModalLabel">
                    New Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
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
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        className="form-select"
                        id="clientId"
                        value={formData.clientId}
                        onChange={handleChange}
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((client) => {
                          return (
                            <option key={client.id} value={client.id}>
                              {client.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default AddProjectModal
