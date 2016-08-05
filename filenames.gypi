{
  'variables': {
    'ppapi_dir': './vendor/nacl_sdk/pepper_49/src/ppapi_cpp',
    'ppapi_sources': [
      '<(ppapi_dir)/ppp_entrypoints.cc',
      '<(ppapi_dir)/core.cc',
      '<(ppapi_dir)/instance.cc',
      '<(ppapi_dir)/module.cc',
      '<(ppapi_dir)/input_event.cc',
      '<(ppapi_dir)/url_loader.cc',
      '<(ppapi_dir)/url_response_info.cc',
      '<(ppapi_dir)/file_ref.cc',
      '<(ppapi_dir)/resource.cc',
      '<(ppapi_dir)/view.cc',
      '<(ppapi_dir)/rect.cc',
      '<(ppapi_dir)/var.cc',
      '<(ppapi_dir)/var_dictionary.cc',
      '<(ppapi_dir)/var_array_buffer.cc'
    ]
  }
}
