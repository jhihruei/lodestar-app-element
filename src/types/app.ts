export type Module =
  | 'currency'
  | 'invoice'
  | 'locale'
  | 'search'
  | 'search_advanced'
  | 'social_connect'
  | 'permission'
  | 'customer_review'
  | 'creator_display'
  | 'xuemi_pt'
  | 'sms_verification'
  | 'line'
  | 'line-notify'
  | 'craft_page'
  | 'xuemi'
  | 'coin'
  | 'coupon_scope'
  | 'member_card'
  | 'point'
  | 'voucher'
  | 'sharing_code'
  | 'referrer'
  | 'group_buying'
  | 'group_buying_ticket'
  | 'learning_statistics'
  | 'member_note'
  | 'member_property'
  | 'member_task'
  | 'member_assignment'
  | 'attend'
  | 'member_rejection'
  | 'member_note_demo'
  | 'learning_statistics_advanced'
  | 'commonhealth_login'
  | 'contract'
  | 'sku'
  | 'sales'
  | 'permission_group'
  | 'activity'
  | 'appointment'
  | 'approval'
  | 'blog'
  | 'merchandise'
  | 'podcast'
  | 'podcast_recording'
  | 'program_package'
  | 'project'
  | 'qrcode'
  | 'tempo_delivery'
  | 'merchandise_customization'
  | 'merchandise_virtualness'
  | 'order_contact'
  | 'practice'
  | 'program_content_material'
  | 'program_content_external_file'
  | 'exercise'
  | 'private_appointment_plan'
  | 'private_activity'
  | 'private_program_package'
  | 'activity_online'
  | 'zoom'
  | 'fb_pixel'
  | 'ga'
  | 'transfer_voucher'
  | 'sale_voucher'
  | 'gtm'
  | 'hotjar'
  | 'tappay'
  | 'spgateway'
  | 'parenting'
  | 'paypal'
  | 'line_login'
  | 'google_login'
  | 'fb_login'
  | 'commonhealth'
  | 'parenting_login'
  | 'coin_back'
  | 'project_auto_delivery'
  | 'analysis'
  | 'certificate'
  | 'sms'
  | 'venue'
  | 'question_library'
  | 'exam'
  | 'customScript'
  | 'gift'
  | 'class_order'
  | 'project_role'
  | 'login_restriction'
  | 'portfolio_project'

export type Currency = {
  id: string
  name: string
  label: string
  unit: string
  minorUnits: number
}

export type NavProps = {
  id: string
  block: 'header' | 'footer' | 'social_media'
  position: number
  label: string
  icon: string | null
  href: string
  external: boolean
  locale: string
  tag: string | null
}

export type AppNavProps = NavProps & {
  subNavs: NavProps[]
}

export type AppProps = {
  id: string
  orgId: string | null
  host: string
  hosts: string[]
  name: string | null
  title: string | null
  description: string | null
  vimeoProjectId?: string | null
  enabledModules: {
    [key in Module]?: boolean
  }
  settings: Record<string, string>
  secrets: Record<string, string> & {
    'payment.perpetual.default_gateway'?: undefined
    'payment.perpetual.default_gateway_method'?: undefined
    'payment.subscription.default_gateway'?: undefined
  }
  currencyId: string
  currencies: { [currencyId: string]: Currency }
  navs: AppNavProps[]
}

export type Permission =
  | 'ACTIVITY_NORMAL'
  | 'ACTIVITY_CATEGORY_ADMIN'
  | 'ACTIVITY_ADMIN'
  | 'ACTIVITY_READ'
  | 'ACTIVITY_ENROLLMENT_READ'
  | 'ACTIVITY_WRITE'
  | 'ACTIVITY_SESSION_WRITE'
  | 'ACTIVITY_TICKET_WRITE'
  | 'ACTIVITY_PUBLISHED'
  | 'ACTIVITY_CATEGORY_READ'
  | 'ACTIVITY_CATEGORY_WRITE'
  | 'ACTIVITY_CATEGORY_DELETE'
  | 'ANALYSIS_ADMIN'
  | 'APP_SETTING_ADMIN'
  | 'APPOINTMENT_PLAN_ADMIN'
  | 'APPOINTMENT_PLAN_NORMAL'
  | 'APPOINTMENT_PERIOD_ADMIN'
  | 'APPOINTMENT_PERIOD_NORMAL'
  | 'BACKSTAGE_ENTER'
  | 'POST_ADMIN'
  | 'POST_NORMAL'
  | 'POST_CATEGORY_ADMIN'
  | 'POST_READ'
  | 'POST_VIEWS_READ'
  | 'POST_WRITE'
  | 'POST_AUTHOR_WRITE'
  | 'POST_DELETE'
  | 'POST_PUBLISH'
  | 'POST_CATEGORY_READ'
  | 'POST_CATEGORY_WRITE'
  | 'POST_CATEGORY_DELETE'
  | 'COIN_ADMIN'
  | 'CONTRACT_RECOGNIZE_PERFORMANCE_EDIT'
  | 'CONTRACT_VALUE_VIEW_ADMIN'
  | 'CONTRACT_VALUE_VIEW_NORMAL'
  | 'CONTRACT_APPROVED_AT_EDIT'
  | 'CONTRACT_CANCELED_AT_EDIT'
  | 'CONTRACT_REFUND_AT_EDIT'
  | 'CONTRACT_PAYMENT_METHOD_EDIT'
  | 'CONTRACT_INSTALLMENT_PLAN_EDIT'
  | 'CONTRACT_PAYMENT_NUMBER_EDIT'
  | 'CONTRACT_NOTE_EDIT'
  | 'CONTRACT_REVENUE_SHARING_EDIT'
  | 'CONTRACT_ATTACHMENT_EDIT'
  | 'COUPON_PLAN_ADMIN'
  | 'COUPON_PLAN_NORMAL'
  | 'COUPON_PLAN_READ'
  | 'COUPON_PLAN_WRITE'
  | 'COUPON_CODE_EXPORT'
  | 'CRAFT_PAGE_ADMIN'
  | 'CRAFT_PAGE_NORMAL'
  | 'CRAFT_MENU_ADMIN'
  | 'EXERCISE_ADMIN'
  | 'EXERCISE_NORMAL'
  | 'MEDIA_LIBRARY_ADMIN'
  | 'CHECK_MEMBER_PAGE_PROGRAM_INFO'
  | 'CHECK_MEMBER_PAGE_APPOINTMENT_INFO'
  | 'SALES_CALL_ADMIN'
  | 'MEMBER_CONTRACT_REVOKE'
  | 'CHECK_MEMBER_COIN'
  | 'CHECK_MEMBER_PAGE_ACTIVITY_INFO'
  | 'CHECK_MEMBER_HISTORY'
  | 'CHECK_MEMBER_PAGE_PODCAST_INFO'
  | 'MEMBER_CATEGORY_ADMIN'
  | 'MEMBER_PHONE_ADMIN'
  | 'MEMBER_STAR_ADMIN'
  | 'MEMBER_MANAGER_ADMIN'
  | 'MEMBER_CONTRACT_INSERT'
  | 'MEMBER_ATTENDANT'
  | 'VIEW_ALL_MEMBER_NOTE'
  | 'CHECK_MEMBER_PAGE_MERCHANDISE_INFO'
  | 'CHECK_MEMBER_ORDER'
  | 'MEMBER_EMAIL_EDIT'
  | 'MEMBER_USERNAME_EDIT'
  | 'MEMBER_CREATE'
  | 'MEMBER_PROPERTY_ADMIN'
  | 'CHECK_MEMBER_PAGE_PROJECT_INFO'
  | 'MEMBER_ADMIN'
  | 'MEMBER_NOTE_ADMIN'
  | 'MERCHANDISE_ADMIN'
  | 'MERCHANDISE_NORMAL'
  | 'MERCHANDISE_CATEGORY_ADMIN'
  | 'SHIPPING_ADMIN'
  | 'SHIPPING_NORMAL'
  | 'PERMISSION_GROUP_ADMIN'
  | 'PODCAST_ADMIN'
  | 'PODCAST_NORMAL'
  | 'PODCAST_PROGRAM_CATEGORY_ADMIN'
  | 'PODCAST_ALBUM_ADMIN'
  | 'PODCAST_ALBUM_CATEGORY_ADMIN'
  | 'PROGRAM_ADMIN'
  | 'PROGRAM_NORMAL'
  | 'PROGRAM_READ'
  | 'PROGRAM_WRITE'
  | 'PROGRAM_DELETE'
  | 'PROGRAM_APPROVE'
  | 'PROGRAM_PUBLISH'
  | 'PROGRAM_CATEGORY_ADMIN'
  | 'PROGRAM_CATEGORY_READ'
  | 'PROGRAM_CATEGORY_WRITE'
  | 'PROGRAM_CATEGORY_DELETE'
  | 'PROGRAM_ISSUE_ADMIN'
  | 'PROGRAM_ISSUE_NORMAL'
  | 'PROGRAM_ISSUE_READ'
  | 'PROGRAM_ISSUE_WRITE'
  | 'PROGRAM_ISSUE_DELETE'
  | 'PRACTICE_ADMIN'
  | 'PRACTICE_NORMAL'
  | 'PROGRAM_PACKAGE_ADMIN'
  | 'PROGRAM_PACKAGE_CATEGORY_ADMIN'
  | 'PROGRAM_PACKAGE_TEMPO_DELIVERY_ADMIN'
  | 'PROGRAM_PACKAGE_READ'
  | 'PROGRAM_PACKAGE_WRITE'
  | 'PROGRAM_PACKAGE_PUBLISH'
  | 'PROGRAM_PACKAGE_CATEGORY_READ'
  | 'PROGRAM_PACKAGE_CATEGORY_WRITE'
  | 'PROGRAM_PACKAGE_CATEGORY_DELETE'
  | 'PROGRAM_PROGRESS_READ'
  | 'PROJECT_ADMIN'
  | 'PROJECT_FUNDING_ADMIN'
  | 'PROJECT_PRE_ORDER_ADMIN'
  | 'PROJECT_ON_SALE_ADMIN'
  | 'PROJECT_CATEGORY_ADMIN'
  | 'PROJECT_PORTFOLIO_ADMIN'
  | 'PROJECT_NORMAL'
  | 'PROJECT_FUNDING_NORMAL'
  | 'PROJECT_PRE_ORDER_NORMAL'
  | 'PROJECT_PORTFOLIO_NORMAL'
  | 'PROJECT_ROLE_ADMIN'
  | 'GROSS_SALES_ADMIN'
  | 'GROSS_SALES_NORMAL'
  | 'SALES_RECORDS_ADMIN'
  | 'SALES_RECORDS_NORMAL'
  | 'SALES_RECORDS_DETAILS'
  | 'SALES_LEAD_ADMIN'
  | 'SALES_LEAD_DELIVERY_ADMIN'
  | 'SALES_LEAD_SELECTOR_ADMIN'
  | 'SALES_PERFORMANCE_ADMIN'
  | 'TASK_ADMIN'
  | 'TASK_CATEGORY_ADMIN'
  | 'VOUCHER_PLAN_ADMIN'
  | 'VOUCHER_PLAN_NORMAL'
  | 'VOUCHER_PLAN_READ'
  | 'VOUCHER_PLAN_WRITE'
  | 'VOUCHER_CODE_EXPORT'
  | 'CUSTOM_SCRIPT_ADMIN'
  | 'GIFT_PLAN_ADMIN'
  | 'GIFT_PLAN_NORMAL'
  | 'GIFT_PLAN_READ'
  | 'GIFT_PLAN_WRITE'
  | 'RFS_APPLIED'
  | 'RFS_ASSIGN'
  | 'RFS_CARE'
  | 'RFS_MANAGER_REVIEW'
  | 'RFS_BRANCH_REVIEW'
  | 'RFS_COUNTER_REVIEW'
  | 'RFS_PURCHASER_REVIEW'
  | 'RFS_ACCOUNTANT_REVIEW'
  | 'RFS_CASHIER_REVIEW'
  | 'MODIFY_MEMBER_ORDER_EQUITY'
