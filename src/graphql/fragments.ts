import gql from 'graphql-tag'

export const programFamilyFields = gql`
  fragment trackingProgramPackageFields on program_package {
    id
    title
    program_package_categories {
      category {
        name
      }
    }
  }
  fragment trackingProgramPackagePlanFields on program_package_plan {
    id
    title
    list_price
    sale_price
  }
  fragment trackingProgramFields on program {
    id
    title
    program_categories {
      category {
        name
      }
    }
    program_roles {
      name
      member_id
    }
  }
  fragment trackingProgramPlanFields on program_plan {
    id
    title
    list_price
    sale_price
  }
`

export const activityFamilyFields = gql`
  fragment trackingActivityFields on activity {
    id
    title
    organizer {
      id
      name
    }
    activity_categories {
      category {
        name
      }
    }
  }
  fragment trackingActivityTicketFields on activity_ticket {
    id
    title
    price
  }
`
