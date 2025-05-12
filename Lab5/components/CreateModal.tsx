import React, { useState } from 'react'
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'

type Props = {
    visible: boolean
    onClose: () => void
    onCreateFolder: (name: string) => void
    onCreateFile: (name: string, content: string) => void
}

export default function CreateModal({ visible, onClose, onCreateFolder, onCreateFile }: Props) {
    const [name, setName] = useState('')
    const [textContent, setTextContent] = useState('')
    const [mode, setMode] = useState<'folder' | 'file'>('folder')

    const reset = () => {
        setName('')
        setTextContent('')
        setMode('folder')
    }

    const handleSubmit = () => {
        if (!name.trim()) return
        if (mode === 'folder') {
            onCreateFolder(name.trim())
        } else {
            onCreateFile(name.trim(), textContent)
        }
        reset()
        onClose()
    }

    return (
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Створити {mode === 'folder' ? 'папку' : 'файл'}</Text>
                    <View style={styles.switchBtns}>
                        <TouchableOpacity onPress={() => setMode('folder')}>
                            <Text style={[styles.switch, mode === 'folder' && styles.active]}>Папка</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMode('file')}>
                            <Text style={[styles.switch, mode === 'file' && styles.active]}>Файл</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput placeholder='Назва' value={name} onChangeText={setName} style={styles.input} />
                    {mode === 'file' && (
                        <TextInput
                            placeholder='Початковий вміст'
                            value={textContent}
                            onChangeText={setTextContent}
                            style={[styles.input, { height: 80 }]}
                            multiline
                        />
                    )}
                    <View style={styles.actions}>
                        <Button
                            title='Скасувати'
                            onPress={() => {
                                reset()
                                onClose()
                            }}
                        />
                        <Button title='Створити' onPress={handleSubmit} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: '#d48ed2', justifyContent: 'center', alignItems: 'center' },
    modal: { backgroundColor: '#e3d3e3', padding: 20, borderRadius: 10, width: '90%' },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    input: { borderBottomWidth: 1, borderColor: '#aaa', marginBottom: 12, padding: 4 },
    switchBtns: { flexDirection: 'row', gap: 16, marginBottom: 10 },
    switch: { fontSize: 16, color: '#555' },
    active: { fontWeight: 'bold', color: '#000' },
    actions: { flexDirection: 'row', justifyContent: 'space-between' }
})
