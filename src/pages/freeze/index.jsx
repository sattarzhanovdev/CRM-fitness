import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import styles from './freeze.module.scss'

const Freezes = () => {
  const [clients, setClients] = useState([])

  useEffect(() => {
    API.getClients().then(res => {
      const data = res.data || {}
      const withFreezes = Object.entries(data)
        .map(([id, client]) => ({ id, ...client }))
        .filter(client =>
          Array.isArray(client.attended) &&
          client.attended.some(item => item.type === 'freezed')
        )
      setClients(withFreezes)
    })
  }, [])

  const cancelFreeze = async (clientId, freezeIndex) => {
    const client = clients.find(c => c.id === clientId)
    if (!client || !Array.isArray(client.attended)) return

    const updatedAttended = [...client.attended]
    const removed = updatedAttended.splice(freezeIndex, 1)[0]

    // Только если действительно была заморозка
    if (removed?.type === 'freezed' && Array.isArray(client.sessions) && client.sessions.length > 0) {
      const updatedSessions = [...client.sessions]
      updatedSessions.pop() // удаляем последний день

      try {
        await API.putClient(clientId, {
          ...client,
          attended: updatedAttended,
          sessions: updatedSessions
        })

        setClients(prev =>
          prev.map(c =>
            c.id === clientId
              ? { ...c, attended: updatedAttended, sessions: updatedSessions }
              : c
          )
        )
      } catch (error) {
        console.error('Ошибка при отмене заморозки:', error)
      }
    }
  }

  return (
    <div className={styles.freezeContainer}>
      <h2 className={styles.freezeTitle}>Все заморозки клиентов</h2>
      {clients.length === 0 && <p className={styles.noClients}>Нет клиентов с заморозками.</p>}
      {clients.map(client => (
        <div key={client.id} className={styles.freezeCard}>
          <h3 className={styles.clientName}>{client.name || '(Без имени)'}</h3>
          <p className={styles.clientPhone}>Телефон: {client.phone_number || '—'}</p>
          <ul className={styles.freezeList}>
            {client.attended
              .map((a, i) => ({ ...a, index: i }))
              .filter(a => a.type === 'freezed')
              .map(a => (
                <li key={a.index} className={styles.freezeItem}>
                  <span className={styles.freezeText}>Заморозка #{a.num} — {a.time}</span>
                  <button
                    className={styles.cancelButton}
                    onClick={() => cancelFreeze(client.id, a.index)}
                  >
                    Отменить
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Freezes