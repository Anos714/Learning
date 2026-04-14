src/
│
├  
├── App.tsx
└── providers/
│ └── QueryProvider.tsx
│
├── features/ # feature-based modules
│ ├── auth/
│ │ ├── api/
│ │ │ └── auth.api.ts
│ │ ├── hooks/
│ │ │ └── useSignup.ts
│ │ ├── components/
│ │ │ └── SignupForm.tsx
│ │ ├── schemas/
│ │ │ └── auth.schema.ts
│ │ └── types.ts
│
├── lib/ # global configs
│ ├── axios.ts
│ └── queryClient.ts
│
├── shared/ # reusable stuff
│ ├── components/
│ └── utils/
│
├── pages/ # route-level pages
│ └── SignupPage.tsx
│
├── main.tsx # entry point
