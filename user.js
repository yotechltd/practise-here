name: { type: String, default: "", required: true},
    id: { type: String},
    password: { type: String, required: true},
    city: String,
        location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true,
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
