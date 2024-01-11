import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'

const AddClientModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const handleChange = (e) => {
    switch (e.target.id) {
      case 'name':
        setFormData({ ...formData, name: e.target.value })
        break
      case 'email':
        setFormData({ ...formData, email: e.target.value })
        break
      case 'phone':
        setFormData({ ...formData, phone: e.target.value })
        break

      default:
        break
    }
  }
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS })
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        },
      })
    },
  })
  const onSubmit = (e) => {
    e.preventDefault()
    if (
      formData.name === '' ||
      formData.email === '' ||
      formData.phone === ''
    ) {
      return alert('Please fill in all fields')
    }
    addClient()
    setFormData({
      name: '',
      email: '',
      phone: '',
    })
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <span>Add Client</span>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
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
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="btn btn-secondary"
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
  )
}
export default AddClientModal
