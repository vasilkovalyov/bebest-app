// libs
import { useState } from 'react'
import cn from 'classnames'

// material ui components
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

// relate utils
import {
  IAutocompleteUserListLessonProps,
  IRenderOptionProps,
} from './AutocompleteUserListLesson.type'

function RenderOption({ fullname, avatar }: IRenderOptionProps) {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Avatar
        alt={fullname}
        src={avatar || ''}
        style={{ width: '30px', height: '30px' }}
      />
      <Typography variant="body1" marginBottom={0}>
        {fullname}
      </Typography>
    </Stack>
  )
}

function AutocompleteUserListLesson({
  loading,
  options,
  className,
  openDropdown,
  onHandleSelectUser,
}: IAutocompleteUserListLessonProps) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Box
      className={cn('autocomplete-user-list-lesson', className)}
      marginBottom={2}
    >
      <Autocomplete
        open={open}
        disableClearable
        options={options}
        loading={loading}
        getOptionLabel={(option) => option.fullname}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        renderOption={(props, option) => (
          <Box
            key={option._id}
            paddingX={2}
            marginBottom={1}
            paddingY={1}
            {...(props as any)}
          >
            <RenderOption {...option} />
          </Box>
        )}
        onOpen={() => {
          setOpen(true)
          openDropdown()
        }}
        onClose={() => {
          setOpen(false)
        }}
        onChange={(_, props) => {
          onHandleSelectUser(props)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select student"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  )
}

export default AutocompleteUserListLesson
